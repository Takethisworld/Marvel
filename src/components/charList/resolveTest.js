function sostavChisla(massivChisel, chislo) {
    // код писать только внутри данной функции
    const result = [];

    function findNumCombo(start, arr, sum) {
        if (sum === chislo) {
            result.push([...arr]);
            return;
        }
        if (sum > chislo) return;

        for (let i = start; i < massivChisel.length; i++) {
            arr.push(massivChisel[i]);
            findNumCombo(i + 1, arr, sum + massivChisel[i]);
            arr.pop()
        }
    }
    massivChisel.sort((a, b) => a - b);
    findNumCombo(0, [], 0);
    return result
}