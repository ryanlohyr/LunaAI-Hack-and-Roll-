FROM binxio/gcp-get-secret:0.4.1

FROM alpine:3.6
COPY --from=0 /gcp-get-secret /usr/local/bin/

FROM python:3.11.1

WORKDIR /app

ENV PORT 8000
EXPOSE $PORT

COPY requirements.txt .

ENV PIP_ROOT_USER_ACTION=ignore
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
