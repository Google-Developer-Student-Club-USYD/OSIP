import groupdocs_parser_cloud
#https://blog.groupdocs.cloud/2021/03/17/extract-text-from-pdf-using-python/
class ExamParser:

    def __init__(self):


        self.client_id = "b9bf2f38-824c-43fb-8a73-f8e89e572209"
        self.client_secret = "83159bcc9d38c116abab41b8c40376dc"
        self.configuration = groupdocs_parser_cloud.Configuration(self.client_id, self.client_secret)
        self.configuration.api_base_url = "https://api.groupdocs.cloud"
        self.my_storage = ""
        self.file_api = groupdocs_parser_cloud.FileApi.from_config(self.configuration) # api initialization

    def uploadFile(self,upload_path,file_path):

        try:
            request = groupdocs_parser_cloud.UploadFileRequest(upload_path, file_path, self.my_storage)
            response = self.file_api.upload_file(request)
        except:
            print("Could not process PDF Upload Request")

    def parsePDF(self,upload_path):

        try:
            # api initialization
            parseApi = groupdocs_parser_cloud.ParseApi.from_config(self.configuration)

            # define text options
            options = groupdocs_parser_cloud.TextOptions()
            options.file_info = groupdocs_parser_cloud.FileInfo()
            options.file_info.file_path = upload_path

            request = groupdocs_parser_cloud.TextRequest(options)
            result = parseApi.text(request)

            return result.text
        except:
            print("Could not process PDF Parse Request")



parser = ExamParser()
parser.uploadFile("sample.pdf", "exams.pdf")
pdf_extracted = parser.parsePDF("sample.pdf")


print("Text: " + pdf_extracted)

# f = open("test.txt", "w")
# f.write(pdf_extracted)
# f.close()


# f = open("test.txt", "r")
# lines = f.readlines()
# f.close()
# print(lines)
