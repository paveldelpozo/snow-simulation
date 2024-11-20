import type {CoordinatesInterface} from "@/interfaces/CoordinatesInterface";
import {Utils} from "@/classes/Utils";

export class Snowflake {
    canvas: HTMLCanvasElement
    coordinates: CoordinatesInterface
    radius: number
    speed: number
    wind: number
    blur: number
    opacity: number

    constructor(canvas, x, y, radius, speed) {
        this.canvas = canvas
        this.coordinates = {
            x,
            y
        }
        this.radius = radius
        this.speed = speed
        this.wind = Utils.random(-1, 1)
        this.blur = radius * 20//Utils.random(1, 10)
        this.opacity = radius / 3
    }

    update() {
        this.coordinates.y += this.speed
        this.coordinates.x += this.wind

        if (this.coordinates.y > this.canvas.height) {
            this.coordinates.y = 0
            this.coordinates.x = Utils.random(0, this.canvas.width)
        }

        if (this.coordinates.x > this.canvas.width) {
            this.coordinates.x = 0
        } else if (this.coordinates.x < 0) {
            this.coordinates.x = this.canvas.width
        }
    }
}
