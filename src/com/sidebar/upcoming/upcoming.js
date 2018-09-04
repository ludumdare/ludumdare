import {h, Component}					from 'preact/preact';
import UIIcon from 'com/ui/icon/icon';
import ButtonLink						from 'com/button-link/link';

import $Calendar from 'shrub/js/calendar/calendar';

export default class SidebarUpcoming extends Component {
	constructor( props ) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
			$Calendar.Get(new Date(), null, 5).then(r => {
				console.log(r);
				if (r.status === 200) {
					this.setState({'calendar': r.calendar});
				}
			});
	}

	render( props, state ) {
		const {calendar} = state;
		const Items = [];
		if (calendar) {
			Object.values(calendar).forEach(item => {
				let options;
				if (item.precision === 'month') {
					options = {'year': 'numeric', 'month': 'long'};
				}
				else if (item.precision === 'day') {
					if (item.getFullYear() === currentYear) {
						options = {'month': 'long', 'day': 'numeric'};
					}
					else {
						options = {'year': 'numeric', 'month': 'short', 'day': 'numeric'};
					}
				}
				Items.push(
					<div class="-item">
						<strong>{item.when.toLocalDateString(undefined, options)}</strong> - {item.what} <UIIcon baseline small>{item.icon}</UIIcon>
					</div>
				);
			});
		}
		return (
			<div class="sidebar-base sidebar-shortlist sidebar-upcoming">
				<div class="-title _font2"><UIIcon baseline>calendar-wide</UIIcon> <span class="-text">Coming Up</span></div>
				{Items}
			</div>
		);
	}
}
