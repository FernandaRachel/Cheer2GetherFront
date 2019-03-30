#!/bin/sh

# pip install --upgrade --user awscli
# access key id: AKIAWO4OGVHKTCTS5WP5
# secret: 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

ng build && aws s3 cp --recursive dist/Cheer2Gether/ s3://cheeer2gether.com/
