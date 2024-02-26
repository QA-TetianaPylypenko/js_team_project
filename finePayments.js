"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);

function payFine() {
 let fineNumberValue = fineNumber.value; // Отримуємо номер штрафу
 let passportValue = passport.value; // Отримуємо паспортні дані
 let creditCardNumberValue = creditCardNumber.value; // Отримуємо номер кредитної картки
 let cvvValue = cvv.value; // Отримуємо CVV
 let amountValue = parseInt(amount.value); // Конвертуємо рядок у числове значення


 // Перевірка на пусті значення

 if (
     !fineNumberValue ||
     !passportValue ||
     !creditCardNumberValue ||
     !cvvValue ||
     !amountValue
 ) {
  alert("Будь ласка, заповніть всі поля");
  return;
 }


 // Валідація номера штрафу

 let fineExist = false;
 // Перебираємо всі штрафи в базі даних
 for (let i = 0; i < DB.length; i++) {
  // Перевіряємо, чи співпадає номер з номером штрафу в базі даних
  if (DB[i].номер === fineNumberValue) {
   fineExist = true;
   break;
  }
 }
 if (!fineExist) {
  alert("Номер штрафу не знайдено");
  return;
 }


 // Валідація суми

 let amountExist = false;
 // Перебираємо всі штрафи в базі даних
 for (let i = 0; i < DB.length; i++) {
  // Перевіряємо співпадіння номеру та суми з базою даних
  if (DB[i].номер === fineNumberValue && DB[i].сума === amountValue) {
   amountExist = true;
   break;
  }
 }
 if (!amountExist) {
  alert("Введена не вірна сума штрафу");
  return;
 }


 // Валідація паспортних даних

 // Регулярний вираз для перевірки формату паспортних даних
 let passportReg = /^[А-ЩЬЮЯЇІЄҐ]{2}\d{6}$/;
 // Перевіряємо відповідність паспортних даних заданому формату
 if (!passportReg.test(passportValue)) {
  alert("Не вірний паспортний номер");
  return;
 }


 // Валідація номера кредитної картки

 // Регулярний вираз для перевірки формату номера кредитної картки
 let creditCardReg = /^\d{16}$/;
 // Перевіряємо відповідність номера картки заданому формату
 if (!creditCardReg.test(creditCardNumberValue)) {
  alert("Не вірна кредитна картка");
  return;
 }


 // Валідація CVV коду

 // Регулярний вираз для перевірки формату CVV
 let cvvReg = /^\d{3}$/;
 // Перевіряємо відповідність CVV заданому формату
 if (!cvvReg.test(cvvValue)) {
  alert("Не вірний CVV");
  return;
 }


 // Видалення об'єкта з бази даних

 for (let i = 0; i < DB.length; i++) {
  // Перебираємо всі штрафи в базі даних
  if (DB[i].номер === fineNumberValue && DB[i].сума === amountValue) {
   // Знаходимо потрібний штраф
   DB.splice(i, 1); // Видаляємо його з бази даних
   break;
  }
 }

 alert("Ви успішно сплатили штраф!");
}
