import type { PluginContext, Message} from '../../packages/cli/zrp/src/library'
import { formatMessages} from '../../packages/cli/zrp/src/library'

export const warn = async (pluginContext: PluginContext, messages: Message[]) => {
	if (messages.length > 0) {
		const warnings = await formatMessages(messages, {
		kind: 'warning',
		color: true,
		})
		warnings.forEach((warning) => pluginContext.warn(warning))
	}
}
