require 'open-uri'
require 'faraday'
require 'json'

class GenericWebhook
	def self.valid_url?(url)
		return url.is_a?(String) && url.start_with?(%r{https?://})
	end

	def initialize(url)
		raise ArgumentError.new('invalid url') unless self.class.valid_url?(url)
		@url = url
	end

	def post(title, body, uri = nil)
		msg = {}
		msg['value1'] = title
		msg['value2'] = body
		msg['value3'] = uri if uri

		conn = Faraday.new(url: @url)
		res = conn.post() do |req|
			req.headers['Content-Type'] = 'application/json'
			req.body = msg.to_json
		end
		res.body
	end
end
