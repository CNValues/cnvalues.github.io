import argparse
import codecs
import json

import pandas as pd


def get_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--ideology', nargs='+', type=str,
                        help='set <input.csv> (required) and <output.js> (optional, \"ideologies.js\" by default)',
                        metavar=('input.csv', 'output.js'))
    parser.add_argument('-q', '--question', nargs='+', type=str,
                        help='set <input.csv> (required) and <output.js> (optional, \"questions.js\" by default)',
                        metavar=('input.csv', 'output.js'))
    parser.add_argument('-s', '--special', nargs='+', type=str,
                        help='set <input.csv> (required) and <output.js> (optional, \"specials.js\" by default)',
                        metavar=('input.csv', 'output.js'))
    return parser


def convert_ideology(input: str, output: str = 'ideologies.js'):
    ideo_name = '意识形态'
    econ_name = '经济'
    govt_name = '政治'
    scty_name = '社会'
    desc_name = '描述'
    link_name = '链接'
    df = pd.read_csv(input)
    print(df)
    ideologies = []
    for _, row in df.iterrows():
        if pd.isna(row[ideo_name]):
            continue
        item = {
            'name': row[ideo_name],
            'stats': {
                'econ': int(row[econ_name]),
                'govt': int(row[govt_name]),
                'scty': int(row[scty_name]),
            },
            'desc': row[desc_name],
            'link': row[link_name]
        }
        ideologies.append(item)
    json_str = json.dumps(ideologies, ensure_ascii=False, indent=4)
    with codecs.open(output, 'w', encoding='utf-8') as f:
        f.write('ideologies = ' + json_str + ';\n')


def convert_question(input: str, output: str = 'questions.js'):
    ques_name = '内容'
    axes_name_to_id = {
        '平等': 'econ',
        '自由': 'govt',
        '进步': 'scty',
        '生态': 'envo',
        '入关学': 'ruguan',
        '阴谋论': 'yinmou',
        '一神论': 'onegod',
        '儒家': 'rujia',
        '工业党': 'gongye',
        '毛粉': 'mao',
        '皇汉': 'han',
        '解体论': 'jieti',
        '民国派': 'minguo',
        '女权主义': 'nvquan',
        '政治冷感': 'suijing',
        '全盘西化': 'dengta',
        '逆向民族主义': 'nimin',
        '地方主义': 'difang',
        '社会达尔文主义': 'sheda',
        '中国特色社会主义': 'tese',
        '海盗党': 'haidao',
        '加速主义': 'jiasu',
        '社群主义': 'shequn',
    }
    df = pd.read_csv(input)
    print(df)
    questions = []
    for _, row in df.iterrows():
        if pd.isna(row[ques_name]):
            continue
        item = {
            'question': row[ques_name],
            'effect': {}
        }
        for name, id in axes_name_to_id.items():
            if not pd.isna(row[name]):
                item['effect'][id] = int(row[name])
        questions.append(item)
    json_str = json.dumps(questions, ensure_ascii=False, indent=4)
    with codecs.open(output, 'w', encoding='utf-8') as f:
        f.write('questions = ' + json_str + ';\n')


def convert_special(input: str, output: str = 'specials.js'):
    spec_name = '特性'
    spec_id = 'id'
    spec_desc = '描述'
    df = pd.read_csv(input)
    print(df)
    specials = []
    for _, row in df.iterrows():
        if pd.isna(row[spec_name]):
            continue
        item = {
            'id': row[spec_id],
            'name': row[spec_name],
            'desc': row[spec_desc]
        }
        specials.append(item)
    json_str = json.dumps(specials, ensure_ascii=False, indent=4)
    with codecs.open(output, 'w', encoding='utf-8') as f:
        f.write('specials = ' + json_str + ';\n')


if __name__ == '__main__':
    parser = get_parser()
    args = vars(parser.parse_args())
    if not any(args.values()):
        parser.print_help()
    if args['ideology'] is not None:
        ideology = args['ideology']
        if len(ideology) <= 2:
            convert_ideology(*ideology)
        else:
            parser.error('argument -i/--ideology: expected 1 or 2 arguments')
    if args['question'] is not None:
        question = args['question']
        if len(question) <= 2:
            convert_question(*question)
        else:
            parser.error('argument -q/--question: expected 1 or 2 arguments')
    if args['special'] is not None:
        special = args['special']
        if len(special) <= 2:
            convert_special(*special)
        else:
            parser.error('argument -s/--special: expected 1 or 2 arguments')
