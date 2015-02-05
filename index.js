


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
QUnit.test( "hello test", function(assert) {
  assert.ok( triangleExists(1,2,3), true );
});
QUnit.test( "hello test", function(assert) {
  assert.ok( triangleExists(2,2,2), true );
});
QUnit.test( "hello test", function(assert) {
  assert.ok( triangleExists(100,50,50), false );
});
QUnit.test( "hello test", function(assert) {
  assert.ok( triangleExists(0,99,3), true );
});
QUnit.test( "hello test", function(assert) {
  assert.ok( triangleExists(-1,2,3), true );
});
            
//-triangleExists(a,b,c), which returns true if a triangle with side lengths a,b,c exists
//-triangleType(a,b,c), which returns “right”, “obtuse”, or “acute” 
