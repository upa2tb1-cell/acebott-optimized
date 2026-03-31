namespace AceOpt {

    // ===== CACHE =====
    let _temp = 0
    let _hum = 0
    let _gas = 0
    let _motion = 0

    let _lastDHT = 0
    let _lastGas = 0
    let _lastPIR = 0

    // ===== CONFIG =====
    let DHT_INTERVAL = 2000
    let GAS_INTERVAL = 500
    let PIR_INTERVAL = 200

    // ===== UPDATE FUNCTIONS =====
    function updateDHT() {
        _temp = Acebott.DHT11_getvalue(DigitalWritePin.P8, DHT11Type.Temperature_C)
        _hum = Acebott.DHT11_getvalue(DigitalWritePin.P8, DHT11Type.Humidity)
    }

    function updateGas() {
        _gas = pins.analogReadPin(AnalogPin.P2)
    }

    function updatePIR() {
        _motion = pins.digitalReadPin(DigitalPin.P0)
    }

    // ===== SCHEDULER =====
    control.inBackground(function () {
        while (true) {
            let now = input.runningTime()

            if (now - _lastDHT > DHT_INTERVAL) {
                updateDHT()
                _lastDHT = now
            }

            if (now - _lastGas > GAS_INTERVAL) {
                updateGas()
                _lastGas = now
            }

            if (now - _lastPIR > PIR_INTERVAL) {
                updatePIR()
                _lastPIR = now
            }

            basic.pause(50)
        }
    })

    // ===== GET FUNCTIONS =====

    //% block="get temperature"
    export function getTemp(): number {
        return _temp
    }

    //% block="get humidity"
    export function getHum(): number {
        return _hum
    }

    //% block="get gas"
    export function getGas(): number {
        return _gas
    }

    //% block="motion detected"
    export function isMotion(): boolean {
        return _motion == 1
    }

    // ===== LCD HELPER =====

    //% block="show environment"
    export function showLCD(): void {
        Acebott.LCD1602_ShowString(0, 0, "T:")
        Acebott.LCD1602_ShowNumber(2, 0, _temp)

        Acebott.LCD1602_ShowString(7, 0, "H:")
        Acebott.LCD1602_ShowNumber(9, 0, _hum)

        Acebott.LCD1602_ShowString(0, 1, "G:")
        Acebott.LCD1602_ShowNumber(2, 1, _gas)
    }
}
