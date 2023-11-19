FROM justmert/lilypad-hugging:v0.0.10


COPY inference.py .

CMD ["/bin/bash"]
