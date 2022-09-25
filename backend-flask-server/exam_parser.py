
import groupdocs_parser_cloud
client_id = "b9bf2f38-824c-43fb-8a73-f8e89e572209"
client_secret = "83159bcc9d38c116abab41b8c40376dc"

configuration = groupdocs_parser_cloud.Configuration(client_id, client_secret)
configuration.api_base_url = "https://api.groupdocs.cloud"
my_storage = ""

# api initialization
file_api = groupdocs_parser_cloud.FileApi.from_config(configuration)
my_storage = ""

request = groupdocs_parser_cloud.UploadFileRequest("sample.pdf", "exams.pdf", my_storage)
response = file_api.upload_file(request)

# api initialization
parseApi = groupdocs_parser_cloud.ParseApi.from_config(configuration)

# define text options
options = groupdocs_parser_cloud.TextOptions()
options.file_info = groupdocs_parser_cloud.FileInfo()
options.file_info.file_path = "sample.pdf"

request = groupdocs_parser_cloud.TextRequest(options)
result = parseApi.text(request)

print("Text: " + result.text)

f = open("test.txt", "a")
f.write(result.text)
f.close()



#https://blog.groupdocs.cloud/2021/03/17/extract-text-from-pdf-using-python/