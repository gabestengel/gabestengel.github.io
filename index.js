$(document).ready(function(){
    
    startTests();
});

function startTests(){
    //triangle exists
    QUnit.test("triangle exists (3,4,5)", function(assert){
        assert.equal(triangleExists(3,4,5), true);
    });
    QUnit.test("triangle exists (3,3,5)", function(assert){
        assert.equal(triangleExists(3,3,5), true);
    });
    QUnit.test("triangle exists (0,4,5)", function(assert){
        assert.equal(triangleExists(0,4,5), false);
    });
    QUnit.test("triangle exists (3,3,3)", function(assert){
        assert.equal(triangleExists(3,4,5), true);
    });
    
    //triangle type
    QUnit.test("triangle type (3,3,3)", function(assert){
        assert.equal(triangleType(3,3,3), "acute");
    });
    QUnit.test("triangle type (3,4,5)", function(assert){
        assert.equal(triangleType(3,4,5), "right");
    });
    QUnit.test("triangle type (3,3,10)", function(assert){
        assert.equal(triangleType(3,3,10), "obtuse");
    });
}

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
