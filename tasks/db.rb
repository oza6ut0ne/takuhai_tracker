#
# Takuhai Tracker database manipulation tasks
#

require 'dotenv'
require_relative '../models/item'

namespace :db do
	def initialize_database
		Dotenv.load if ENV['RACK_ENV'] == 'production'
		Mongoid::load!('config/mongoid.yml')
	end

	desc 'Database search key'
	task :search_key, :key do |task, args|
		initialize_database
		begin
			item = TakuhaiTracker::Item.find_by(key: args[:key])
			puts JSON.pretty_generate(JSON.parse(item.to_json))
		rescue Mongoid::Errors::DocumentNotFound
			puts "Item not found."
		end
	end

	desc 'Database delete key'
	task :delete_key, :key do |task, args|
		initialize_database
		begin
			item = TakuhaiTracker::Item.find_by(key: args[:key])
			puts JSON.pretty_generate(JSON.parse(item.to_json))
			print "Delete? (y/N): "
			item.delete if $stdin.gets =~ /^y/i
		rescue Mongoid::Errors::DocumentNotFound
			puts "Item not found."
		end
	end
end