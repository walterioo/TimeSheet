// Initialize Firebase
var config = {
    apiKey: "AIzaSyA_pHu8FgsCiUrMYkyAidXupvdxNfRfvwM",
    authDomain: "learning-firebase-bootcamp.firebaseapp.com",
    databaseURL: "https://learning-firebase-bootcamp.firebaseio.com",
    projectId: "learning-firebase-bootcamp",
    storageBucket: "learning-firebase-bootcamp.appspot.com",
    messagingSenderId: "808046487088"
};
firebase.initializeApp(config);
var database = firebase.database();
var startDateFormat = 'MM/DD/YYYY';

$('#myform').submit(function (event) {
    event.preventDefault();
    var name = $('#employee-name').val().trim();
    var role = $('#role').val().trim();
    var startDate = $('#start-date').val().trim();
    var rate = $('#rate').val().trim();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    $('input').val('');
})

database.ref().on('child_added', function (snapshot) {
    var name = snapshot.val().name;
    var role = snapshot.val().role;
    var startDate = moment(snapshot.val().startDate).format(startDateFormat);
    var rate = snapshot.val().rate;

    var todayDate = moment().format(startDateFormat);
    console.log(todayDate + ' ' + startDate);

    var monthsWorked = moment(todayDate).diff(startDate, 'months');

    var monthlyRate = Math.floor(rate / 12);
    var billed = Math.floor(monthlyRate * monthsWorked);



    addTableRow(name, role, startDate, monthsWorked, monthlyRate, billed);

})

function addTableRow(name, role, startDate, monthsWorked, monthlyRate, billed) {
    var row = $("<tr>")
        .append($("<td>").text(name))
        .append($("<td>").text(role))
        .append($("<td>").text(startDate))
        .append($("<td>").text(monthsWorked))
        .append($("<td>").text(monthlyRate))
        .append($("<td>").text(billed));

    $("#employees").append(row);
}