namespace AceOpt {

    let temp = 0
    let hum = 0
    let gas = 0

    // ===== KHỞI TẠO =====
    export function init() {
        Acebott.LCD1602_Init()
        Acebott.RFID_init()
        music.setBuiltInSpeakerEnabled(false)
        Acebott.setLed(DigitalWritePin.P1, SwitchStatus.OFF)
        basic.clearScreen()
    }

    // ===== NHIỆT ĐỘ + ĐỘ ẨM (NHẸ) =====
    export function readDHT() {
        temp = Acebott.DHT11_getvalue(DigitalWritePin.P8, DHT11Type.Temperature_C)
        hum = Acebott.DHT11_getvalue(DigitalWritePin.P8, DHT11Type.Humidity)

        Acebott.LCD1602_ShowString(0, 0, "T:")
        Acebott.LCD1602_ShowNumber(2, 0, temp)

        Acebott.LCD1602_ShowString(7, 0, "H:")
        Acebott.LCD1602_ShowNumber(9, 0, hum)
    }

    // ===== GAS (TỐI ƯU - KHÔNG GỌI LẠI 3 LẦN) =====
    export function readGas() {
        gas = Acebott.MQ4_Sensor(AnalogReadPin.P2)

        Acebott.LCD1602_ShowString(0, 1, "G:")
        Acebott.LCD1602_ShowNumber(2, 1, gas)

        if (gas >= 300) {
            music.setBuiltInSpeakerEnabled(true)
            music.playTone(262, 100)
        } else {
            music.setBuiltInSpeakerEnabled(false)
        }
    }

    // ===== PIR (KHÔNG BLOCK) =====
    export function isMotion(): boolean {
        return Acebott.PIRMotion(DigitalPin.P0) == 1
    }

    // ===== RFID (NHẸ) =====
    export function readRFID() {
        let id = Acebott.RFID_getID()
        if (id != 0) {
            Acebott.LCD1602_ShowString(6, 1, "Hello")
            music.playTone(523, 100)
            basic.pause(200)
            Acebott.LCD1602_ShowString(6, 1, "     ")
        }
    }

}
