
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="" block="Air quality monitor"
namespace custom {
    let buf=pins.createBuffer(40);
    /**
     * TODO: 请求串口数据
     * @param tx 串口TX引脚, eg: SerialPin.P1
     * @param rx 串口RX引脚, eg: SerialPin.P2
     */
    //% block="Set digital pin TX:%tx RX:%rx"
    //% weight=90
    export function setPing(tx:SerialPin,rx: SerialPin): void {
       serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate9600
        );
        serial.setTxBufferSize(300);
        serial.setRxBufferSize(300);
    }

    /**
     * TODO: 请求PM2.5数据
     */
    //% block="pm2.5"
    //% weight=80
    export function pm25(): number {
        let buf = serial.readBuffer(40);
        let CR1, CR2, PMSa, PMSb, PMS;
        CR1 = (buf[38]<<8)|buf[39];
        CR2 = 0;
        for(let i=0; i<38; i++)
            CR2 += buf[i];
        if(CR1 == CR2){
            PMSa = buf[12];
            PMSb = buf[13];
        }
        PMS = (PMSa<<8)|PMSb;
        basic.pause(10)
        return PMS;
    }
    /**
     * TODO: 甲醛数据
     */
    //% block="methanal"
    //% weight=70
    export function methanal(): number {
        let buf = serial.readBuffer(40);
        //serial.writeLine("" + (buf));
        let CR1, CR2, FMHDSa, FMHDSb, FMHDS;
        CR1 = (buf[38]<<8)|buf[39];
        CR2 = 0;
        for(let i=0; i<38; i++)
            CR2 += buf[i];
        if(CR1 == CR2){
            FMHDSa = buf[28]; 
            FMHDSb = buf[29];  
        }
        FMHDS = (FMHDSa << 8) + FMHDSb; 
        basic.pause(10)
        return FMHDS;
    }
    /**
     * TODO: 温度数据
     */
    //% block="temperature"
    //% weight=60
    export function temperature(): number {
        let buf = serial.readBuffer(40);
        //serial.writeLine("" + (buf));
        let CR1, CR2, TPSa, TPSb, TPS;
        CR1 = (buf[38]<<8)|buf[39];
        CR2 = 0;
        for(let i=0; i<38; i++)
            CR2 += buf[i];
        if(CR1 == CR2){
            TPSa = buf[30];     
            TPSb = buf[31];      
        }
        TPS = (TPSa << 8) + TPSb;    
        basic.pause(10)
        return TPS/10;
    }
    /**
     * TODO: 湿度数据
     */
    //% block="humidity"
    //% weight=50
    export function humidity(): number {
        let buf = serial.readBuffer(40);
        //serial.writeLine("" + (buf));
        let CR1, CR2, HDSa, HDSb, HDS;
        CR1 = (buf[38]<<8)|buf[39];
        CR2 = 0;
        for(let i=0; i<38; i++)
            CR2 += buf[i];
        if(CR1 == CR2){
             HDSa = buf[32];      
             HDSb = buf[33];      
        }
        HDS = (HDSa << 8) + HDSb;      
        basic.pause(10)
        return HDS/10;
    }
}
