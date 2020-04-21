module StubbedRequests
  # # Upload images
  # def stub_upload_image_request(url: nil)
  #   url ||= /digitaloceanspaces\.com\//
  #   stub_request(:put, url).
  #     to_return(status: 200, body: nil, headers: {})
  # end

  # # ===========================================================
  # #                     YOUTUBE API CALLS
  # # ===========================================================

  # def stub_youtube_image_request(file: nil, url: nil)
  #   file ||= 'image.jpg'
  #   url ||= /yt3|i\.ytimg\.com/
  #   stub_request(:get, url)
  #     .with(
  #       headers: { 'Accept' => '*/*', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'CarrierWave/2.0.2' }
  #     ).to_return(status: 200, body: file_fixture("youtube/#{file}"), headers: {})
  # end
  # def stub_youtube_api_request(url: nil, path: nil, body: nil, method: :get, extra_headers: {})
  #   headers = { 'Content-Type' => 'application/json' }.merge(extra_headers)
  #   url ||= %r{https://www.googleapis.com/youtube/v3#{path}}
  #   body ||= file_fixture("youtube#{path}")
  #   response = { status: 200, body: body, headers: headers }

  #   stub_request(method, url).to_return(response)
  # end

  # # ===========================================================
  # #                       ARTE API CALLS
  # # ===========================================================

  # def stub_arte_image_request(file: nil, url: nil)
  #   file ||= 'image.jpg'
  #   url ||= /static-cdn\.arte\.tv/
  #   stub_request(:get, url)
  #     .with(
  #       headers: { 'Accept' => '*/*', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'CarrierWave/2.0.2' }
  #     ).to_return(status: 200, body: file_fixture("arte/#{file}"), headers: {})
  # end

  # def stub_arte_api_request(url: nil, path: nil, body: nil, method: :get, extra_headers: {})
  #   headers = { 'Content-Type' => 'application/json' }.merge(extra_headers)
  #   url ||= /arte.tv#{path}/
  #   body ||= file_fixture("arte#{path}")
  #   response = { status: 200, body: body, headers: headers }

  #   stub_request(method, url).to_return(response)
  # end
end
