const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            // TODO
            assert.strictEqual(!!dic, true);
        });
        it('добавление элемента', () => {
            const dic = new core.Dictionary();
            dic.set("First", "Data");
            assert.strictEqual(dic.get("First"), "Data");
        });
        it('ввод не string', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.set(11, 2), "Not a string!");
        });
        it('есть ли элемент', () => {
            const dic = new core.Dictionary();
            dic.set("First", "Data");
            assert.strictEqual(dic.has("First"), true);
        });
        it('размер словаря', () => {
            const dic = new core.Dictionary();
            dic.set("First", "Data");
            assert.strictEqual(dic.size(), 1);
        });
        it('удаление', () => {
            const dic = new core.Dictionary();
            dic.set("First", "Data");
            dic.delete("First");
            assert.strictEqual(dic.size(), 0);
        });
        it('очистка', () => {
            const dic = new core.Dictionary();
            dic.set("First", "Data");
            dic.clear();
            assert.strictEqual(dic.size(), 0);
        });
    });
});