FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-devel

ENTRYPOINT ["python3" "/app/inference.py"]

RUN mkdir -p /app
# Set the working directory in the container
WORKDIR /app

# Install transformers, datasets, and evaluate libraries
RUN pip3 install --no-cache-dir transformers[torch] datasets evaluate

ENV NVIDIA_DRIVER_CAPABILITIES=compute,utility
ENV NVIDIA_VISIBLE_DEVICES=all

# Run python script when the container launches
COPY inference.py .

CMD ["/bin/bash"]
