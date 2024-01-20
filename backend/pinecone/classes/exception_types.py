class PromptTooLong(Exception):
    def __init__(self, **kwargs):
        token_limit = kwargs["token_limit"]
        prompt_token_length = kwargs["prompt_token_length"]
        self.value = f"Please shorten your prompt. The maximum token length is {token_limit}. You entered {prompt_token_length} tokens."  # noqa: E501

    def __str__(self):
        return self.value
