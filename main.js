const widthInput = document.querySelector('input[data-input="width"]')
const heightInput = document.querySelector('input[data-input="height"]')
const button = document.querySelector(".btn")
const scaleInput = document.querySelector(".input-range")
let x0 = 50
let y0 = 50
let k = 20
button.addEventListener("click", drawSign)
scaleInput.addEventListener("change", drawSign)

// math
function createLine(x0, y0, x1, y1, corner) {
	this.x0 = x0
	this.y0 = y0
	this.x1 = x1
	this.y1 = y1
	this.corner = corner
}
function createSign() {
	let sign = {
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
					if (this.height <= 2300) {
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
					else {
						console.log('делим знак на 2 части');
					}
				}
				else {
					this.carcas = 35
					console.log('шаг 2500');
					console.log('горизонтмальной линии нет');
					console.log('посередине знака 1 вертикальная линия с 35 уголком, остальные слева и справа 25 уголок');
				}
			}
			else {
				if (this.width >= 2250) {
					if (this.height >= 1250) {
						// console.log('Вертикальные линии 35 уголок');
						// console.log('шаг 1250');
						// console.log('у горизонтальной линии 25 уголок и позиция h / 2');
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
					else {
						console.log('В данном случае высота не может быть меньше 1250.');
					}
				}
				else {
					if (this.width >= 1000) {
						if (this.height >= 1200 && this.height <= 1500) {
							// console.log('гор. линий нет.');
							// console.log('одна вертикальная линия с 25 уголком, шаг width / 2');
							// возможно у horLine все параметры сделать 0 для отрисовки
							this.carcas = 25
							this.horLine = undefined
							this.verticalLines.push(
								new createLine(
									Math.floor(this.width / 2),
									0,
									Math.floor(this.width / 2),
									this.height
								)
							)
						}
						else {
							console.log('не бывает.');
						}
					}
					else {
						console.log('не бывает.');
					}
				}
			}
		},
	}
	return sign
}

function drawSign(event) {
	let object = createSign()
	// отрисовка каркаса
	k = scaleInput.value
	let width = parseInt(widthInput.value)
	let height = parseInt(heightInput.value)
	// width = Number(widthInput.value)
	// width = +widthInput.value
	object.calculate(width, height)
	console.log(object)
	const canvas = document.querySelector("canvas")
	const ctx = canvas.getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.strokeRect(
		x0,
		y0,
		Math.floor(width / k) + x0,
		Math.floor(height / k) + y0
	)
	ctx.font = "bold 15pt Arial"
	ctx.fillText("45", 50, 50)
	// отрисовка линий
	ctx.moveTo(
		Math.floor(object.horLine.x0 / k) + x0,
		Math.floor(object.horLine.y0 / k) + y0
	)
	ctx.lineTo(
		Math.floor(object.horLine.x1 / k) + 2 * x0,
		Math.floor(object.horLine.y1 / k) + y0
	)
	ctx.lineWidth = "1" //толщина линии
	ctx.stroke() // обводка линии
}
