FROM justmert/lilypad-hugging:v0.0.7

COPY inference.py .

ENTRYPOINT ["python3" "./inference.py"]

CMD ["/bin/sh", "-c", "python3 ./inference.py"]