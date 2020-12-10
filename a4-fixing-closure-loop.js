function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    (function printItem(x) {
      var item = "item" + list[x];
      result.push(function () {
        console.log(item + " " + list[x]);
      });
    })(i);
  }
  return result;
}

function testList() {
  var fnlist = buildList([1, 2, 3]);
  // using j only to help prevent confusion - could use i
  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

console.log(testList());

// previously

// function buildList(list) {
//   var result = [];
//   for (var i = 0; i < list.length; i++) {
//       var item = 'item' + list[i];
//       result.push( function() {alert(item + ' ' + list[i])} );
//   }
//   return result;
// }

// function testList() {
//   var fnlist = buildList([1,2,3]);
//   // using j only to help prevent confusion - could use i
//   for (var j = 0; j < fnlist.length; j++) {
//       fnlist[j]();
//   }
// }

//returns: item3 undefined, three times
