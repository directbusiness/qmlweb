registerQmlType({
  module: "QtQuick",
  name: "BorderImage",
  versions: /.*/,
  baseClass: "Item",
  enums: {
    BorderImage: {
      Stretch: "stretch", Repeat: "repeat", Round: "round",
      Null: 1, Ready: 2, Loading: 3, Error: 4
    }
  },
  properties: {
    source: "url",
    horizontalTileMode: { type: "enum", initialValue: "stretch" }, // BorderImage.Stretch
    verticalTileMode: { type: "enum", initialValue: "stretch" }, // BorderImage.Stretch
    status: { type: "enum", initialValue: 1 } // BorderImage.Null
  }
}, class {
  constructor(meta) {
    callSuper(this, meta);
    var self = this;

    this.border = new QObject(this);
    createProperty("int", this.border, "left");
    createProperty("int", this.border, "right");
    createProperty("int", this.border, "top");
    createProperty("int", this.border, "bottom");

    this.sourceChanged.connect(this, function() {
        this.dom.style.borderImageSource = "url(" + engine.$resolvePath(this.source) + ")";
    });
    this.border.leftChanged.connect(this, updateBorder);
    this.border.rightChanged.connect(this, updateBorder);
    this.border.topChanged.connect(this, updateBorder);
    this.border.bottomChanged.connect(this, updateBorder);
    this.horizontalTileModeChanged.connect(this, updateBorder);
    this.verticalTileModeChanged.connect(this, updateBorder);

    function updateBorder() {
        this.dom.style.OBorderImageSource = "url(" + engine.$resolvePath(this.source) + ")";
        this.dom.style.OBorderImageSlice = this.border.top + " "
                                                + this.border.right + " "
                                                + this.border.bottom + " "
                                                + this.border.left + " "
                                                + "fill";
        this.dom.style.OBorderImageRepeat = this.horizontalTileMode + " "
                                                    + this.verticalTileMode;
        this.dom.style.OBorderImageWidth = this.border.top + "px "
                                                + this.border.right + "px "
                                                + this.border.bottom + "px "
                                                + this.border.left + "px";

        this.dom.style.borderImageSlice = this.border.top + " "
                                                + this.border.right + " "
                                                + this.border.bottom + " "
                                                + this.border.left + " "
                                                + "fill";
        this.dom.style.borderImageRepeat = this.horizontalTileMode + " "
                                                    + this.verticalTileMode;
        this.dom.style.borderImageWidth = this.border.top + "px "
                                                + this.border.right + "px "
                                                + this.border.bottom + "px "
                                                + this.border.left + "px";
    }
  }
});
