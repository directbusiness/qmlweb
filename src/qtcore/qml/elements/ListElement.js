function QMLListElement(meta) {
    QMLBaseObject.call(this, meta);

    for (var i in meta.object) {
        if (i[0] != "$") {
            createSimpleProperty("variant", this, i);
        }
    }
    applyProperties(meta.object, this, this, this.$context);
}

constructors['ListElement'] = QMLListElement;