import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component({
	name: 'button-counter',
	template: `<button class="btn" @click="clicked">You clicked me {{ count }} times.</button>`
})
export class ButtonCounter extends Vue {
	@Prop() count: number;

	@Emit() clicked() { }
}
