import { Vue, Component } from 'vue-property-decorator';
import { ButtonCounter } from './components/button-counter.component';

@Component({
	components: { ButtonCounter },
	template: `
	<div>
		<button-counter @clicked="onButtonClicked" :count="count"></button-counter>
	</div>
	`
})
export class App extends Vue {
	count = 0;
	onButtonClicked() {
		this.count++;
	}
}
