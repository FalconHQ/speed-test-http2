//PERFOMANCE
let t = window.performance.timing
window.onload = () => {
	setTimeout(() => {
		let pageload = t.loadEventEnd - t.navigationStart
		console.log("HTTP2", pageload, "ms");
		parent.postMessage({
			pageload:pageload,
			origin:'http2'
		},'*');
	}, 0);
}


