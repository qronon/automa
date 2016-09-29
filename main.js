
var QArray = function(base){
	if(base){
		this.array = base;
	}else{
		this.array = []
	}
}

QArray.prototype.array = function(){
	return this.array;
}

QArray.prototype.has = function(object){
	if(this.indexOf(object) < 0){
		return false;
	}
	return true;
}

QArray.prototype.indexOf = function(object){
	for(var i in this.array){
		if(object == this.array[i]){
			return i;
		}
	}
	return -1;
}

QArray.prototype.findIndex = function(num, func){
	var fv = 0;
	for(var i=0; i<this.array.length; i++){
		fv += func(this.array[i], i);
		if(fv > num){
			return i;
		}
	}

	return this.array.length;
}

QArray.prototype.max = function(func){
	var fv = 0;
	for(var i=0; i<this.array.length; i++){
		var v = func(this.array[i], i);
		if(v > fv){
			fv = v;
		}
	}
	return fv;
}

QArray.prototype.sum = function(func){
	var fv = 0;
	for(var i=0; i<this.array.length; i++){
		fv += func(this.array[i], i);
	}
	return fv;
}

QArray.prototype.delete = function(object, func){
	this.delete(object, -1, func);
}

QArray.prototype.set = function(object, index, func){
	var ix = this.indexOf(object);

	if(ix >= 0){
		this.array.splice(ix,1);

		if(index > ix){
			index = index - 1;
		}
	}

	if(index < 0){
		var fv = 0;
		if(func){
			for(var k=0; k<ix; k++){
				fv += func(this.array[k], k);
			}
		}

		for(var i=ix; i<this.array.length; i++){
			if(this.onchange){
				if(func){
					fv += func(this.array[i], i);
				}
				this.onchange(this.array[i], i, fv);
			}
		}
	}else{

		this.array.splice(index, 0, object);

		if(ix >= 0){
			var i,j;
			if(index > ix){
				i = ix;
				j = index;
			}else{
				j = ix;
				i = index;
			}

			var fv = 0;
			if(func){
				for(var k=0; k<i; k++){
					fv += func(this.array[k], k);
				}
			}

			for(; i<=j; i++){
				if(this.onchange){
					if(func){
						fv += func(this.array[i], i);
					}
					this.onchange(this.array[i], i);
				}
			}
		}else{

			var fv = 0;
			if(func){
				for(var k=0; k<i; k++){
					fv += func(this.array[k], k);
				}
			}

			for(var i=index; i<this.array.length; i++){
				if(this.onchange){
					if(func){
						fv += func(this.array[i], i);
					}
					this.onchange(this.array[i], i);
				}
			}
		}
	}
}


var assert = chai.assert;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
    	
    	var obj = { name : "NAME" }

    	var qa = new QArray([1,2,3]);
    	qa.set(obj, 1);

    	assert.equal(1, qa.array[0]);
       	assert.equal(obj, qa.array[1]);
    	assert.equal(2, qa.array[2]);
    	assert.equal(3, qa.array[3]);

    });
  });

  describe('#dd()', function() {
    it('s', function() {

		var test = {}
		var key = new Object
		test[key] = "a";
    	assert.equal("a", test[key]);
    });
  });
});
