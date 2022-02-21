//  Mảng listStudent chứa các object student
var listStudent = new Array();

//  Biến đếm
var count = 0;

//  Biến check đã hiệu ứng css cho HS giỏi chưa
var checkFindGoodStudent = false;

//  Biến check sắp xếp tăng/giảm
var ascending = true;

//  Biến để sử dụng trong sắp xếp mảng
var sortBy = {
    name: "name",
    math: "math",
    physical: "physical",
    chemistry: "chemistry",
    avg: "avg"
};

$(document).ready(function () {
    $('#btn-import').click(function () {
        let student = {
            name: "",
            math: 0,
            physical: 0,
            chemistry: 0,
            avg: "?",
            id: count
        }

        if (checkInput() == true) {
            ++count;
            student.name = $('#input-item__name').val();
            student.math = $('#input-item__math').val();
            student.physical = $('#input-item__physical').val();
            student.chemistry = $('#input-item__chemistry').val();

            $('#input-item__name').val("");
            $('#input-item__math').val("");
            $('#input-item__physical').val("");
            $('#input-item__chemistry').val("");

            listStudent.push(student);
            importRow(count, student);
        }
    });

    $('#btn-average').click(function () {
        deleteTable();
        averageListStudent();
        importTable();
    });

    $('#btn-findGoodStudent').click(function () {
        findGoodStudent();
    });

    //  Xử lý sự kiện cho btn sort_fullname
    $('#sort_fullname').click(function () {
        if (ascending == true) {
            sortStudent(sortBy.name, true);
            ascending = false;
        } else {
            sortStudent(sortBy.name, false);
            ascending = true;
        }
    });
    //  Xử lý sự kiện cho btn sort_math
    $('#sort_math').click(function () {
        if (ascending == true) {
            sortStudent(sortBy.math, true);
            ascending = false;
        } else {
            sortStudent(sortBy.math, false);
            ascending = true;
        }
    });
    //  Xử lý sự kiện cho btn sort_physical
    $('#sort_physical').click(function () {
        if (ascending == true) {
            sortStudent(sortBy.physical, true);
            ascending = false;
        } else {
            sortStudent(sortBy.physical, false);
            ascending = true;
        }
    });
    //  Xử lý sự kiện cho btn sort_chemistry
    $('#sort_chemistry').click(function () {
        if (ascending == true) {
            sortStudent(sortBy.chemistry, true);
            ascending = false;
        } else {
            sortStudent(sortBy.chemistry, false);
            ascending = true;
        }
    });
    //  Xử lý sự kiện cho btn sort_avg
    $('#sort_avg').click(function () {
        if (ascending == true) {
            sortStudent(sortBy.avg, true);
            ascending = false;
        } else {
            sortStudent(sortBy.avg, false);
            ascending = true;
        }
    });

    //  Xử lý sự kiện của btn-delete
    $('#btn-delete').click(function () {
        deleteListCheck();
        deleteTable();
        importTable();
        if (checkFindGoodStudent === true)
            findGoodStudent();
    });

    $('#btn-edit').click(function () {
        let text = $("#btn-edit").text();

        if (text == "Edit") {
            editListCheck();
        } else if (text == "Update") {
            updateListCheck();
            deleteTable();
            averageListStudent();
            importTable();
            if (checkFindGoodStudent === true)
                findGoodStudent();
        }
    });
});

/**
 * @description Hàm kiểm tra dữ liệu đầu vào
 * @returns Trả về true: tất các các trường dữ liệu đều đúng
 */
function checkInput() {
    let checkResult = true;
    let name = $('#input-item__name').val();
    let math = parseFloat($('#input-item__math').val());
    let physical = parseFloat($('#input-item__physical').val());
    let chemistry = parseFloat($('#input-item__chemistry').val());

    if (name == "") {
        $('#error-name').removeClass('error--hide');
        checkResult = false;
    } else {
        $('#error-name').addClass('error--hide');
    }

    if (isNaN(math) == true) {
        $('#error-math').removeClass('error--hide');
        checkResult = false;
    } else {
        $('#error-math').addClass('error--hide');
    }

    if (isNaN(physical) == true) {
        $('#error-physical').removeClass('error--hide');
        checkResult = false;
    } else {
        $('#error-physical').addClass('error--hide');
    }

    if (isNaN(chemistry) == true) {
        $('#error-chemistry').removeClass('error--hide');
        checkResult = false;
    } else {
        $('#error-chemistry').addClass('error--hide');
    }
    return checkResult;
}

/**
 * @description Hàm import object vào trong table
 * @param {*} stt : Stt
 * @param {*} param1 : object student
 */
function importRow(stt, { name, math, physical, chemistry, avg }) {
    if ($('#listStudent')) {
        $('#listStudent').append(`
            <tr id="row${stt - 1}">
                <td id="stt${stt - 1}">${stt}</td>
                <td id="name${stt - 1}">${name}</td>
                <td id="math${stt - 1}">${math}</td>
                <td id="physical${stt - 1}">${physical}</td>
                <td id="chemistry${stt - 1}">${chemistry}</td>
                <td id="average${stt - 1}">${avg}</td>
                <td id="td-checkbox${stt - 1}"> <input type="checkbox" name="edit" id="checked${stt - 1}"></td>
            </tr>
        `);
    }
}

/**
 * @description import mảng listStudent vào table
 */
function importTable() {
    for (let i = 0; i < listStudent.length; i++) {
        importRow(i + 1, listStudent[i])
    }
}
/**
 * @description Hàm xóa table
 */
function deleteTable() {
    var x = $("#listStudent").children().length;
    for (let i = 0; i < x; i++) {
        $('#row' + i).remove();
    }
}

/**
 * @description Tính điểm trung bình của listStudent
 */
function averageListStudent() {
    for (let i = 0; i < listStudent.length; i++) {
        let avg = (parseFloat(listStudent[i]['math'])
            + parseFloat(listStudent[i]['physical'])
            + parseFloat(listStudent[i]['chemistry'])) / 3;
        listStudent[i]['avg'] = avg.toFixed(1);
    }
}

/**
 * @description Tìm sinh viên giỏi
 */
function findGoodStudent() {
    $('#listStudent>tr').each(function (index, element) {
        var avg = parseFloat($(element).children('#average' + index).text());
        console.log(avg);
        if (avg >= 8) {
            $(element).addClass('good-student');
        }
    })
    checkFindGoodStudent = true;
}



/**
 * @description Hàm sắp xếp
 * @param {*} param thuộc tính sắp xếp 
 * @param {*} asc chiều sắp xếp tăng/giảm
 */
function sortStudent(param, asc) {
    if (asc == true) {
        //Sắp xếp mảng tăng
        switch (param) {
            case sortBy.name:
                listStudent.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                });

                break;
            case sortBy.math:
                listStudent.sort(function (a, b) {
                    return b.math - a.math;
                });
                break;
            case sortBy.physical:
                listStudent.sort(function (a, b) {
                    return b.physical - a.physical;
                });
                break;
            case sortBy.chemistry:
                listStudent.sort(function (a, b) {
                    return b.chemistry - a.chemistry;
                });
                break;
            case sortBy.avg:
                listStudent.sort(function (a, b) {
                    return b.avg - a.avg;
                });
                break;
        }
    } else {
        //Sắp xếp mảng giảm
        switch (param) {
            case sortBy.name:
                listStudent.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                    return 0;
                });

                break;
            case sortBy.math:
                listStudent.sort(function (a, b) {
                    return a.math - b.math;
                });
                break;
            case sortBy.physical:
                listStudent.sort(function (a, b) {
                    return a.physical - b.physical;
                });
                break;
            case sortBy.chemistry:
                listStudent.sort(function (a, b) {
                    return a.chemistry - b.chemistry;
                });
                break;
            case sortBy.avg:
                listStudent.sort(function (a, b) {
                    return a.avg - b.avg;
                });
                break;
        }

    }

    //Xóa dữ liệu trong table
    deleteTable();

    //import dữ liệu từ mảng vào table HTML
    importTable()
    if (checkFindGoodStudent === true)
        findGoodStudent();
}

/**
 * @description Hàm xóa các student được check
 */
function deleteListCheck() {
    var tempArray = [];

    for (let i = 0; i < listStudent.length; i++) {
        let checkbox = $('#checked' + i)[0];
        if (checkbox.checked == false) {
            tempArray.push(listStudent[i]);
        }
    }
    listStudent = tempArray;

    count = listStudent.length; //set lại count để sau khi xóa xong có thể cập nhật được id đúng khi import thếm sv
}

/**
 * @description Hàm xử lý edit các đối tượng checked trong table
 */
function editListCheck() {
    var checkItemChecked = false;
    for (let i = 0; i < listStudent.length; i++) {
        let checkbox = $('#checked' + i)[0];
        if (checkbox.checked == true) {
            $('#name' + i).html(`<input id="ip-name${i}" type="text" value="${listStudent[i]["name"]}">`);
            $('#math' + i).html(`<input id="ip-math${i}" type="text" value="${listStudent[i]["math"]}">`);
            $('#physical' + i).html(`<input id="ip-physical${i}" type="text" value="${listStudent[i]["physical"]}">`);
            $('#chemistry' + i).html(`<input id="ip-chemistry${i}" type="text" value="${listStudent[i]["chemistry"]}">`);
            checkItemChecked = true;
        }
    }
    if (checkItemChecked == true)
        $("#btn-edit").text("Update");

}
/**
 * @description Hàm update dữ liệu sau khi edit
 */
function updateListCheck() {
    for (let i = 0; i < listStudent.length; i++) {
        let checkbox = $('#checked' + i)[0];
        if (checkbox.checked == true) {
            listStudent[i]['name'] = $("#ip-name" + i).val();
            listStudent[i]['math'] = $("#ip-math" + i).val();
            listStudent[i]['physical'] = $("#ip-physical" + i).val();
            listStudent[i]['chemistry'] = $("#ip-chemistry" + i).val();
        }
    }
    checkItemChecked = false;
    $("#btn-edit").text("Edit");
}