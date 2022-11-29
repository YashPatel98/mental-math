function wrong () {
    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    basic.showIcon(IconNames.No)
    OLED.init(64, 128)
    OLED.writeStringNewLine("")
    OLED.writeStringNewLine("WRONG!!!")
    OLED.writeStringNewLine("WRONG!!!")
    OLED.writeStringNewLine("WRONG!!!")
    OLED.writeStringNewLine("")
    end()
}
function correct () {
    game.addScore(1)
    randomise()
    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
}
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    if (!(started)) {
        start()
    } else {
        if (answer) {
            correct()
        } else {
            wrong()
        }
    }
})
function end () {
    if (highscore < game.score()) {
        highscore = game.score()
        OLED.writeStringNewLine("NEW HIGH:" + highscore)
    } else {
        OLED.writeStringNewLine("HIGH:" + highscore)
    }
    OLED.writeStringNewLine("SCORE:" + game.score())
    started = false
}
function slow () {
    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    basic.showIcon(IconNames.No)
    OLED.init(64, 128)
    OLED.writeStringNewLine("")
    OLED.writeStringNewLine("TOOOO")
    OLED.writeStringNewLine("SLOW!")
    OLED.writeStringNewLine("")
    end()
}
function display () {
    OLED.init(128, 64)
    if (_type == 0) {
        sign = "+"
    } else if (_type == 1) {
        sign = "-"
    } else if (_type == 2) {
        sign = "x"
    } else if (_type == 3) {
        sign = "/"
    }
    OLED.writeStringNewLine("" + i1 + sign + i2)
    OLED.writeStringNewLine("=" + a)
}
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    if (!(started)) {
        start()
    } else {
        if (answer) {
            wrong()
        } else {
            correct()
        }
    }
})
function randomise () {
    answer = Math.randomBoolean()
    i1 = randint(1, 9)
    i2 = randint(1, 9)
    _type = randint(0, 3)
    if (_type == 0) {
        if (answer) {
            a = i1 + i2
        } else {
            a = i1 + (i2 + randint(1, 9))
        }
    } else if (_type == 1) {
        if (answer) {
            a = i1 - i2
        } else {
            a = i1 - (i2 + randint(1, 9))
        }
    } else if (_type == 2) {
        if (answer) {
            a = i1 * i2
        } else {
            a = i1 * (i2 + randint(1, 9))
        }
    } else if (_type == 3) {
        if (answer) {
            a = i1 / i2
        } else {
            a = i1 / (i2 + randint(1, 9))
        }
    }
    display()
}
function start () {
    started = true
    time = input.runningTime()
    game.setScore(0)
    randomise()
}
let time = 0
let a = 0
let i2 = 0
let i1 = 0
let sign = ""
let _type = 0
let highscore = 0
let answer = false
let started = false
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
started = false
OLED.init(128, 64)
OLED.writeStringNewLine("QUICK")
OLED.writeStringNewLine("MATHS")
OLED.writeStringNewLine("A:True   B:False")
OLED.writeStringNewLine("Press any key to")
OLED.writeStringNewLine("start")
basic.forever(function () {
    if (started && input.runningTime() - time > 5000) {
        slow()
    }
})
