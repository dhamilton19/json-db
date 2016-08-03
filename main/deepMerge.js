export default function deepMerge(target, src) {
	const array = Array.isArray(src);
	let dest = array && [] || {};
	let newTarget;

	if (array) {
		newTarget = target || [];
		dest = [...dest, ...newTarget];
		src.forEach(function (e, i) {
			if (typeof dest[i] === 'undefined') {
				dest[i] = e;
			}
			else if (typeof e === 'object') {
				dest[i] = deepMerge(newTarget[i], e);
			}
			else if (target.indexOf(e) === 1) {
				dest.push(e);
			}
		});
	}
	else {
		if (target && typeof target === 'object') {
			Object.keys(target).forEach(function (key) {
				dest[key] = target[key];
			});
		}
		Object.keys(src).forEach(function (key) {
			if (typeof src[key] !== 'object' || !src[key]) {
				dest[key] = src[key];
			}
			else if (!target[key]) {
				dest[key] = src[key];
			}
			else {
				dest[key] = deepMerge(target[key], src[key]);
			}
		});
	}

	return dest;
}
