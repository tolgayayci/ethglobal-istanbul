FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-devel

ENTRYPOINT ["python3" "/app/inference.py"]
COPY inference.py /app

ENV NVIDIA_DRIVER_CAPABILITIES=compute,utility
ENV NVIDIA_VISIBLE_DEVICES=all

# Set the working directory in the container
WORKDIR /app

# Install transformers, datasets, and evaluate libraries
RUN pip3 install --no-cache-dir transformers[torch] datasets evaluate

RUN python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('we love you'))"

# Run python script when the container launches
CMD ["/bin/bash"]