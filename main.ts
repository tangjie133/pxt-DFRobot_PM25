custom.setPing(SerialPin.P1, SerialPin.P8)
basic.forever(function () {
    serial.writeValue("x", custom.methanal())
    serial.writeValue("y", custom.pm25())
    serial.writeValue("z", custom.temperature())
    serial.writeValue("g", custom.humidity())
})
