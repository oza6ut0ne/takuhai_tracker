/*
 * generic_webhook_setting.js
 *
 * Copyright (C) 2017 by TADA Tadash <t@tdtds.jp>
 * You can modify and/or distribute this under GPL.
 */
import * as React from 'react';
import {Component} from 'flumpt';
import {MuiThemeProvider, TextField, FlatButton} from 'material-ui';
import {ContentSave} from 'material-ui/svg-icons';

export const SUBMIT_GENERIC_WEBHOOK = 'submit-generic-webhook';

export default class GenericWebhookSetting extends Component {
	constructor(...args){
		super(...args);
		this.state = {token: ''};
	}

	componentDidMount() {
		this.setState({url: this.props.setting.generic_webhook_url});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({url: nextProps.setting.generic_webhook_url});
	}

	onSubmit(e) {
		e.preventDefault();
		this.dispatch(SUBMIT_GENERIC_WEBHOOK, this.state.url);
		this.setState({url: ""});
	}

	render() {
		let message = this.props.setting.generic_webhook_validation ? '' : 'URLが指定されていないか、正しくない可能性があります。';

		return(<form className='notify ifttt' onSubmit={(e) => this.onSubmit(e)}>
			<h3>Generic Webhook</h3>
			<div className='form-inner'>
				<p>その他のWebhookによる通知が欲しい場合はWebhookのURLを入力して下さい。</p>
				<MuiThemeProvider>
					<TextField style={{width: '32ex'}}
						hintText="URL"
						errorText={message}
						value={this.state.url}
						onChange={(e) => this.setState({url: e.target.value})}/>
				</MuiThemeProvider>
				<MuiThemeProvider>
					<FlatButton label='Save' type='submit' primary={true}/>
				</MuiThemeProvider>
			</div>
		</form>);
	}
};

