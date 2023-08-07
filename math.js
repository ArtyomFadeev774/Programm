function createLine(x0, y0, x1, y1, corner) {
	this.x0 = x0
	this.y0 = y0
	this.x1 = x1
	this.y1 = y1
	this.corner = corner
}
function createSign() {
	sign = {
		carcas: undefined,
		width: undefined,
		height: undefined,
		horLine: undefined,
		verticalLines: [],
		calculate: function (w, h) {
			this.width = w
			this.height = h
			if (this.width >= 4000) {
				this.carcas = 45
				if (this.height >= 1250) {
					// создаём горизонтальную линию
					this.horLine = new createLine(
						0,
						Math.floor(this.height / 2),
						this.width,
						Math.floor(this.height / 2),
						25
					)
					let xLine = 1250
					for (let i = 0; i < Math.floor(this.width / 1250); i++) {
						this.verticalLines.push(
							new createLine(xLine, 0, xLine, this.height, 35)
						)
						xLine += 1250
					}
				}
			}
		},
	}
	return sign
}
export { createSign }
