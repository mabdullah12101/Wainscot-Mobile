import React from 'react';
import WebView from 'react-native-webview';

export default function Payment({route}) {
  const url = route.params.url;

  return <WebView source={{uri: url}} />;
}
