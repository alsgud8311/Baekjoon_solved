function solution(orders, course) {
    let setMenu = {};

    // 주어진 문자열의 모든 조합을 구하는 함수
    function getCombinations(order, length) {
        const result = [];
        if (length === 1) return order.map(v => [v]);
        order.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combinations = getCombinations(rest, length - 1);
            const attached = combinations.map(combination => [fixed, ...combination]);
            result.push(...attached);
        });
        return result;
    }

    // 모든 주문에 대해 가능한 모든 조합 찾기
    orders.forEach(order => {
        const sortedOrder = order.split('').sort();
        course.forEach(length => {
            const combinations = getCombinations(sortedOrder, length);
            combinations.forEach(combination => {
                const key = combination.join('');
                if (setMenu[key]) setMenu[key]++;
                else setMenu[key] = 1;
            });
        });
    });

    // 가장 많이 주문된 메뉴 조합 찾기
    let result = [];
    course.forEach(len => {
        let maxCount = 0;
        let tempResult = [];
        Object.keys(setMenu).forEach(menu => {
            if (menu.length === len && setMenu[menu] > 1) {
                if (setMenu[menu] > maxCount) {
                    maxCount = setMenu[menu];
                    tempResult = [menu];
                } else if (setMenu[menu] === maxCount) {
                    tempResult.push(menu);
                }
            }
        });
        result.push(...tempResult);
    });

    return result.sort();
}