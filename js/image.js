class ImageBuilder {
  /**
   * 图标
   * @type {[][]}
   */
  imgs;
  /**
   * 坐标轴倾向Text
   * @type {[]}
   */
  texts = [];
  /**
   * Bar颜色
   * @type {[][]}
   */
  colors;
  /**
   * Bar比例
   * @type {[][]}
   */
  barData;
  /**
   * 版本
   * @type {string}
   */
  version = "0.3.5 b";
  /**
   * canvas
   * @type {HTMLCanvasElement}
   */
  canvas;
  /**
   * Canvas Context
   * @type {HTMLCanvasElement}
   */
  canvasContext;
  /**
   * 行长宽
   */
  line = {
    height: 120,
    width: 800,
  };
  /**
   * 百分比条参数
   */
  bar = {
    height: 72,
  };
  /**
   * 图标高度
   * @type {number}
   */
  imgHeight = 100;
  /**
   * 图标宽度
   * @type {number}
   */
  imgWidth = 100;
  /**
   * 标题高度
   * @type {number}
   */
  titleHeight = 170;
  /**
   * 侧面留白宽度
   * @type {number}
   */
  sideDistance = 20;
  /**
   * 滚动条到图片的距离
   * @type {number}
   */
  barDistance = 20;
  /**
   * 标题栏字体
   */
  titleLine = {
    size: "80px",
    font: "Montserrat",
  };
  /**
   * 意识形态字体
   */
  ideologyLine = {
    size: "50px",
    font: "Montserrat",
  };
  /**
   * 项目地址字体
   */
  projectLine = {
    size: "30px",
    font: "Montserrat",
  };
  /**
   * 百分比字体
   */
  percentageLine = {
    size: "50px",
    font: "Montserrat",
  };
  /**
   * 意识形态
   */
  ideology = "None";

  /** 在canvas中绘制图片 */
  getImg() {
    this.standardizeData();
    let lineLength = this.imgs.length;
    let titleHeight = this.titleHeight;
    let line = this.line;
    this.createCanvas(
      lineLength * line.height + titleHeight,
      this.line.width,
      "#EEEEEE"
    );

    this.drawTitleLine(this.sideDistance);
    for (let i = 0; i < lineLength; i++) {
      let imgHeight = this.imgHeight;
      let imgWidth = this.imgWidth;
      let sideDistance = this.sideDistance;
      let barDistance = this.barDistance;

      this.drawImage(i, imgHeight, imgWidth, sideDistance);

      this.drawBar(i, imgWidth, barDistance, sideDistance);

      this.drawPercentage(i, imgWidth, sideDistance, barDistance);

      this.drawTexts(i, this.texts[i]);
    }
  }
  /**
   * 把图片绘制到canvas
   * @param {any} i Index
   * @param {any} imgHeight 图片高度
   * @param {any} imgWidth 图片宽度
   * @param {any} sideDistance 侧面留白
   */
  drawImage(i, imgHeight, imgWidth, sideDistance) {
    let line = this.line;
    let titleHeight = this.titleHeight;
    let imgs = this.imgs;

    this.canvasContext.drawImage(
      imgs[i][0],
      sideDistance,
      line.height * i + titleHeight + (line.height - imgHeight) / 2,
      imgHeight,
      imgWidth
    );
    this.canvasContext.drawImage(
      imgs[i][1],
      line.width - imgWidth - sideDistance,
      line.height * i + titleHeight + (line.height - imgHeight) / 2,
      imgHeight,
      imgWidth
    );
  }
  /**
   * 绘制百分比条
   * @param {any} i Index
   * @param {any} imgWidth 图标宽度
   * @param {any} barDistance 图标到Bar的距离
   * @param {any} sideDistance 侧面留白
   */
  drawBar(i, imgWidth, barDistance, sideDistance) {
    let line = this.line;
    let barData = this.barData;
    let barHeight = this.bar.height;
    let colors = this.colors;
    let titleHeight = this.titleHeight;

    let startX = imgWidth + sideDistance + barDistance;
    let startY = (line.height - barHeight) / 2 + line.height * i + titleHeight;
    let barLen = line.width - 2 * sideDistance - 2 * imgWidth - 2 * barDistance;
    let leftBar = barLen * (barData[i][0] / (barData[i][0] + barData[i][1]));
    let rightBar = barLen * (barData[i][1] / (barData[i][0] + barData[i][1]));
    this.canvasContext.fillStyle = colors[i][0];
    this.canvasContext.fillRect(startX, startY, leftBar, barHeight);
    this.canvasContext.fillStyle = colors[i][1];
    this.canvasContext.fillRect(startX + leftBar, startY, rightBar, barHeight);
  }
  /**
   * 绘制百分比
   * @param {any} i Index
   * @param {any} imgWidth 图标宽度
   * @param {any} sideDistance 侧边留白
   * @param {any} barDistance 图标到Bar的距离
   */
  drawPercentage(i, imgWidth, sideDistance, barDistance) {
    let line = this.line;
    let barHeight = this.bar.height;
    let titleHeight = this.titleHeight;
    let percentageLine = this.percentageLine;

    let left = this.barData[i][0];
    let leftX = imgWidth + sideDistance + barDistance;
    let right = this.barData[i][1];
    let rightX = line.width - imgWidth - sideDistance - barDistance;
    let bottomY = (line.height - barHeight) / 2 + line.height * i + titleHeight;

    this.canvasContext.fillStyle = "#222222";
    this.canvasContext.font = percentageLine.size + " " + percentageLine.font;
    this.canvasContext.textAlign = "left";
    this.canvasContext.textBaseline = "bottom";
    this.canvasContext.fillText(left + "%", leftX, bottomY);
    this.canvasContext.textAlign = "right";
    this.canvasContext.fillText(right + "%", rightX, bottomY);
  }
  /**
   * 绘制标题
   * @param {any} sideDistance 侧边留白距离
   */
  drawTitleLine(sideDistance) {
    let line = this.line;

    let titleLine = this.titleLine;
    let ideologyLine = this.ideologyLine;
    let projectLine = this.projectLine;
    let version = this.version;

    this.canvasContext.fillStyle = "#222222";
    this.canvasContext.font = "700 " + titleLine.size + " " + titleLine.font;
    this.canvasContext.textAlign = "left";
    this.canvasContext.fillText("CNValues", sideDistance, 90);
    this.canvasContext.font = ideologyLine.size + " " + ideologyLine.font;
    this.canvasContext.fillText(this.ideology, sideDistance, 140);
    this.canvasContext.font =
      "300 " + projectLine.size + " " + projectLine.font;
    this.canvasContext.textAlign = "right";
    this.canvasContext.fillText(
      "cnvalues.gitlab.io",
      line.width - sideDistance,
      60
    );
    this.canvasContext.fillText(version, line.width - sideDistance, 90);
  }
  /**
   * 绘制政治坐标轴倾向
   * @param {any} i Index
   * @param {any} text Text
   */
  drawTexts(i, text) {
    let line = this.line;
    let titleHeight = this.titleHeight;
    let barHeight = this.bar.height;

    let bottomY = (line.height - barHeight) / 4 + line.height * i + titleHeight;

    this.canvasContext.fillStyle = "#222222";
    this.canvasContext.textAlign = "center";
    this.canvasContext.textBaseline = "bottom";
    this.canvasContext.fillText(text, line.width / 2, bottomY);
  }
  /**
   * 使数据标准化
   * */
  standardizeData() {
    for (let i = 0; i < this.barData.length; i++)
      for (let j = 0; j < this.barData[i].length; j++)
        if (typeof this.barData[i][j] != "number")
          this.barData[i][j] = parseFloat(this.barData[i][j]);
  }
  /**
   * 创建canvas
   * @param {any} height 高度
   * @param {any} width 宽度
   * @param {any} color 背景色
   */
  createCanvas(height, width, color) {
    var c = document.createElement("canvas");
    //var c = document.getElementById("canvas1")
    var ctx = c.getContext("2d");
    c.width = width;
    c.height = height;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    this.canvas = c;
    this.canvasContext = ctx;
  }
}
