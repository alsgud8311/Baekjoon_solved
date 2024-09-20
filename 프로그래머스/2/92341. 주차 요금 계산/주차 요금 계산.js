function solution(fees, records) {
    const parkingLot = new Map();
    
    records.forEach((record) => {
        const [time, carNum, inAndOut] = record.split(" ");
        if (!parkingLot.has(carNum)) {
            parkingLot.set(carNum, {
                time: 0,
                inTime: -1,
            });
        }
        const car = parkingLot.get(carNum);
        
        if (inAndOut === "OUT") {
            parkingLot.set(carNum, {
                time: car.time + (convertToMin(time) - car.inTime),
                inTime: -1,
            });
        } else {
            parkingLot.set(carNum, {
                time: car.time,
                inTime: convertToMin(time),
            });
        }
    });
    
    let answer = result(fees, parkingLot);
    answer.sort((a, b) => a.carNum - b.carNum);
    return answer.map((car) => car.fee);
}

function result(fees, parkings) {
    let answer = [];
    const [basicHour, basicFee, perHour, perFee] = fees;
    
    for (let [carNum, val] of parkings) {
        if (val.inTime !== -1) {
            val.time += convertToMin("23:59") - val.inTime;
        }
        
        if (val.time <= basicHour) {
            answer.push({ carNum: carNum, fee: basicFee });
        } else {
            const fee = basicFee + Math.ceil((val.time - basicHour) / perHour) * perFee;
            answer.push({ carNum: carNum, fee: fee });
        }
    }
    
    return answer;
}

function convertToMin(time) {
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
}
