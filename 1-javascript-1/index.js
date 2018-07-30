const accumulate1 = (x) => {
	let accumulator = x;
	
	const accumulateInner = (y) => {
		if (y === undefined) {
			return accumulator;
		} else {
			accumulator += y;
			return accumulateInner;			
		}
	};

	return accumulateInner;
};

console.log(accumulate1(1)(2)(3)(4)(5)(6)());

const accumulate2 = (x) => {
	let accumulator = x;
	
	const accumulateInner = (y) => {
		if (y === undefined) {
			return accumulateInner.valueOf();
		} else {
			accumulator += y;
			return accumulateInner;
		}
	};
	
	accumulateInner.valueOf = function() {
		return accumulator;
	};

	return accumulateInner;
};

console.log(accumulate2(1)(2)(3)(4)(5)(6)());