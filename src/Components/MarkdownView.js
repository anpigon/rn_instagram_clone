import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import styled from 'styled-components';
import Markdown, {
	getUniqueID, 
	MarkdownIt,
	// renderRules,
	PluginContainer
} from 'react-native-markdown-renderer';

// https://github.com/markdown-it/markdown-it
const md = new MarkdownIt({
	typographer: true,
	linkify: true,
	// html: true,
	// xhtmlOut: true,
});

md.linkify.tlds('.py', false);  // disables .py as top level domain
        // Reload with full tlds list
md.linkify.tlds('onion', true)            // Add unofficial `.onion` domain
md.linkify.add('git:', 'http:')           // Add `git:` protocol as "alias"
md.linkify.add('ftp:', null)              // Disable `ftp:` ptotocol
md.linkify.set({ fuzzyIP: true });        // Enable IPs in fuzzy links (without schema)
md.linkify.add('@', {
	validate: function (text, pos, self) {
		var tail = text.slice(pos);

		if (!self.re.twitter) {
			self.re.twitter =  new RegExp(
				'^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
			);
		}
		if (self.re.twitter.test(tail)) {
			// Linkifier allows punctuation chars before prefix,
			// but we additionally disable `@` ("@@mention" is invalid)
			if (pos >= 2 && tail[pos - 2] === '@') {
				return false;
			}
			return tail.match(self.re.twitter)[0].length;
		}
		return 0;
	},
	normalize: function (match) {
		match.url = 'https://steemit.com/' + match.url.replace(/^@/, '');
	}
});

// renderRules['html_block'] = (node, children, parent, styles) => {
// 	console.log('html_block', {
// 		node, children, parent, styles
// 	})
// 	return (
// 		<Text key={node.key} style={styles.text}>
// 			{node.content}
// 		</Text>
// 	);
// };
// renderRules['html_inline'] = (node, children, parent, styles) => {
// 	return <Text key={node.key}>{children}</Text>;
// };

const renderRules = {
	link: (node, children, parent, styles) => {
		return (
			<Text key={node.key} style={styles.link} onPress={() => openUrl(node.attributes.href)}>
				{children} <Icon name='external-link' type='Feather' style={{color:'#2088ff', fontSize:18 }}/>
			</Text>
		);
	},
}

const plugin = new PluginContainer(
	(md, name, options) => {
		console.log('plugin', {md, name, options})
		const parse = state => {
			console.log('parse', state)
			const Token = state.Token;

			for (let i = 0; i < state.tokens.length; i++) {
				const block = state.tokens[i];
				if (block.type !== 'inline') {
					continue;
				}

				for (let j = 0; j < block.children.length; j++) {
					const token = block.children[j];
					if (token.type !== 'text') {
						continue;
					}
					// if (token.content === name) {
					// 	const newToken = new Token(name, '', token.nesting);
					// 	newToken.content = token.content;
					// 	block.children = md.utils.arrayReplaceAt(block.children, j, [newToken]);
					// }
					// if (/<\/?center>/.test(token.content)) {
					// 	const newToken = new Token('text', '', token.nesting);
					// 	// newToken.content = token.content;
					// 	block.children = md.utils.arrayReplaceAt(block.children, j, [newToken]);
					// }
					// if (/<br\/?>/.test(token.content)) {
					// 	const newToken = new Token('text', '', token.nesting);
					// 	// newToken.content = token.content;
					// 	block.children = md.utils.arrayReplaceAt(block.children, j, [newToken]);
					// }
					// 
				}
			}
		};

		md.core.ruler.after('inline', name, parse);
	},
	'plugin',
	{}
);

const parseHtml = (html) => {
	return html
		.replace(/<\/?center>/gi, '')
		.replace(/<br\/?>/gi, '\n')
	;
}

export default ({ children }) => (
	<Markdown 
		markdownit={md} 
		rules={renderRules}
		plugins={[plugin]}
		style={styles}
	>{parseHtml(children)}</Markdown>
);

// https://github.com/mientjan/react-native-markdown-renderer/blob/master/src/lib/styles.js
const styles = StyleSheet.create({
	heading: {
		borderBottomWidth: 1,
		borderColor: '#000000',
	},
	heading1: {
		fontSize: 32,
		backgroundColor: '#000000',
		color: '#FFFFFF',
	},
	heading2: {
		fontSize: 24,
	},
	heading3: {
		fontSize: 18,
	},
	heading4: {
		fontSize: 16,
	},
	heading5: {
		fontSize: 13,
	},
	heading6: {
		fontSize: 11,
	},
	link: {
		color: '#2088ff',
    textDecorationLine: 'underline',
	},
	text: {
		fontFamily: 'Noto Serif KR',
		fontSize: 18,
	}
});
