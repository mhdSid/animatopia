class Timer {
	constructor () {
		this.startTime = null
		this.lastResetTime = null
	}

	start () {
		this.startTime = process.hrtime()
		return this.getTimeElapsed()
	}

	reset () {
		this.lastResetTime = this.startTime
		this.startTime = null
	}

	getTimeElapsed () {
		if (this.startTime === null) {
			throw new Error('Timer has not been started.')
		}
		const endTime = process.hrtime(this.startTime)
		return endTime[0] * 1000 + endTime[1] / 1000000 // Convert to milliseconds
	}
}

module.exports = {
	Timer
}
