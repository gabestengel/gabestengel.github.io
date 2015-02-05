

QUnit.test( "exist 1,2,3", function(assert) {
  assert.deepEqual( triangleExists(1,2,3), true );
});
QUnit.test( "exist 2,2,2", function(assert) {
  assert.deepEqual( triangleExists(2,2,2), true );
});
QUnit.test( "exist 100,50,50", function(assert) {
  assert.deepEqual( triangleExists(100,50,50), false );
});
QUnit.test( "exist 0, 99, 3", function(assert) {
  assert.deepEqual( triangleExists(0,99,3), true );
});
QUnit.test( "exist -1,2,3", function(assert) {
  assert.deepEqual( triangleExists(-1,2,3), false );
});
QUnit.test("acute equalateral", function(assert){
    assert.equal(triangleType(3,3,3), "acute");
});
QUnit.test("right triangle 3,4,5", function(assert){
    assert.equal(triangleType(3,4, 5), "right");
});


function triangleExists(side1,side2,side3){
    var sides= [side1,side2,side3];
    sides.sort();
    if(sides[2]+sides[1]>sides[0]){
        return true;
    }
    return false;
}

function triangleType(side1,side2,side3){
    if(side1*side1+side2*side2==side3*side3){
        return "right";
    }
    else if(side1*side1+side2*side2>side3*side3){
        return "acute";
    }
    else if(side1*side1+side2*side2<side3*side3){
        return "obtuse";
    }
}

            
//-triangleExists(a,b,c), which returns true if a triangle with side lengths a,b,c exists
//-triangleType(a,b,c), which returns “right”, “obtuse”, or “acute” 
