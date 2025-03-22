$(document).ready(function () {

    let choices;
    let enableDebug;
    let current_question = 0;

    initialize();
    $('.tooltipped').tooltip();

    function initialize() {
        choices = new Array(questions.length).fill(0);
        // Shuffle Quesions
        questions.sort(() => Math.random() - 0.5);

        $("#btn-strongly-positive")
            .click(() => {
                choices[current_question] = +1.0;
                next_question();
            });
        $("#btn-positive")
            .click(() => {
                choices[current_question] = +0.33;
                next_question();
            });
        $("#btn-uncertain")
            .click(() => {
                choices[current_question] = 0.0;
                next_question();
            });
        $("#btn-negative")
            .click(() => {
                choices[current_question] = -0.33;
                next_question();
            });
        $("#btn-strongly-negative")
            .click(() => {
                choices[current_question] = -1.0;
                next_question();
            });

        $("#btn-prev").click(() => {
            prev_question();
        });

        render_question();
    }

    function render_question() {
        $("#question-text").html(questions[current_question].question);
        $("#question-number").html(`第 ${current_question + 1} 题 剩余 ${questions.length - current_question - 1} 题`);
        if (current_question === 0) {
            $("#btn-prev").addClass("disabled");
        } else {
            $("#btn-prev").removeClass("disabled");
        }
    }

    function next_question() {
        if (current_question < questions.length - 1) {
            current_question++;
            render_question();
        } else {
            results();
        }
    }

    function prev_question() {
        if (current_question !== 0) {
            current_question--;
            render_question();
        }
    }

    function is_special_axis(axis) {
        return specials.some((value) => {
            return value.id === axis;
        })
    }

    function results() {

        // 首先找到所有出现过的属性
        let scores = {};
        for (let q of questions) {
            for (let axis in q.effect) {
                scores[axis] = 0;
            }
        }

        let max_scores = {...scores};

        for (let i = 0; i < questions.length; i++) {
            for (let axis in questions[i].effect) {
                let choice = choices[i];
                scores[axis] += choice * questions[i].effect[axis];
                max_scores[axis] += Math.abs(questions[i].effect[axis]);
            }
        }

        for (let axis in scores) {
            scores[axis] = (scores[axis] + max_scores[axis]) / (2 * max_scores[axis]);
            scores[axis] = Math.round(scores[axis] * 100);
        }

        
        location.href = "results.html#" + $.param(scores);
    }
});
