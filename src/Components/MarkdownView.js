import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components";
import Layout from '../constants/Layout';
import { Icon } from 'native-base';

// https://github.com/archriss/react-native-render-html
import HTMLView from 'react-native-render-html';

import Remarkable from 'remarkable';
// import console = require('console');
const md = new Remarkable({ 
  html: true, 
  linkify: true, 
  breaks: false 
});

const BASE_FONT_SIZE = 18;
const BASE_FONT_FAMILY = 'Noto Serif KR';

const baseFontStyle = {
  fontFamily: BASE_FONT_FAMILY,
  fontSize: BASE_FONT_SIZE 
}

// Tag Styles 
const tagsStyles = { 
  hr: { marginVertical: BASE_FONT_SIZE / 2, height: 1, backgroundColor: '#e9e7e7' },
  a: { textDecorationLine: 'underline', color: '#2088ff' },
  b: { fontWeight: 'bold', fontFamily: `${BASE_FONT_FAMILY} Bold` },
  strong: { fontWeight: 'bold', fontFamily: `${BASE_FONT_FAMILY} Bold` },
  h1: _generateHeadingStyle(BASE_FONT_SIZE, 2, 0.67),
  h2: _generateHeadingStyle(BASE_FONT_SIZE, 1.5, 0.83),
  h3: _generateHeadingStyle(BASE_FONT_SIZE, 1.17, 1),
  h4: _generateHeadingStyle(BASE_FONT_SIZE, 1, 1.33),
  h5: _generateHeadingStyle(BASE_FONT_SIZE, 1, 1, 0.2),
  h6: _generateHeadingStyle(BASE_FONT_SIZE, 1, 1, 0.2),
};
function _generateHeadingStyle (baseFontSize, fontMultiplier, marginMultiplier, marginBottomMultiplier) {
  return {
    fontSize: baseFontSize * fontMultiplier,
    marginTop: baseFontSize * marginMultiplier,
    marginBottom: baseFontSize * (marginBottomMultiplier || marginMultiplier),
    fontWeight: 'bold',
    fontFamily: `${BASE_FONT_FAMILY} Bold`,
  };
}

// Tag Renders
const renderers = {
  a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
    const style = [
      passProps.tagsStyles ? passProps.tagsStyles['a'] : undefined,
      htmlAttribs.style ? htmlAttribs.style : undefined,
    ];
    const { parentWrapper, onLinkPress, key, data, parentTag } = passProps;
    const onPress = (evt) => onLinkPress && htmlAttribs && htmlAttribs.href ?
        onLinkPress(evt, htmlAttribs.href, htmlAttribs) :
        undefined;
    if (parentWrapper === 'Text') {
      return (
        <Text {...passProps} style={style} onPress={onPress} key={key}>
          { children || data } 
          <Icon 
            name='external-link' 
            type='Feather' 
            style={{ 
              fontSize: (passProps.tagsStyles['a'] || passProps.tagsStyles[parentTag]).fontSize * 0.8, 
              color: '#2088ff', 
              marginLeft: 4,
            }}/>
        </Text>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} key={key}>
            { children || data }
        </TouchableOpacity>
      );
    }
  }
}

// [Event] onLinkPress
const onLinkPress = (evt, href) => { Linking.openURL(href); }

// MarkdownView Component
const MarkdownView = ({ children }) => {

  let htmlContent = md.render(children);

  return (
    <HTMLView
      html={htmlContent}
      textSelectable={true}
      imagesMaxWidth={Layout.width - 20}
      onLinkPress={onLinkPress}
      baseFontStyle={baseFontStyle}
      tagsStyles={tagsStyles}
      renderers={renderers}
    />
  );

}

export default MarkdownView;