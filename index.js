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

function triangleExists(a,b,c){
    var sides= [a,b,c];
    sides.sort();
    if(sides[0]+sides[1]>=sides[2] && sides[0]+sides[2]>=sides[1] && sides[1]+sides[2]>=sides[0]){
        return true;
    }
    return false;
}

function triangleType(a,b,c){
    if(a*a+b*b==c*c){
        return "right";
    }
    else if(a*a+b*b>c*c){
        return "acute";
    }
    else{
        return "obtuse";
    }
}