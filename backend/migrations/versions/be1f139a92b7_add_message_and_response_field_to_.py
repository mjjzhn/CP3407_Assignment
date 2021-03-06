"""add message and response field to Contact_form

Revision ID: be1f139a92b7
Revises: b4598defefe3
Create Date: 2022-05-23 01:24:06.797457

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be1f139a92b7'
down_revision = 'b4598defefe3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('contact_form', sa.Column('message', sa.Text(), nullable=True))
    op.add_column('contact_form', sa.Column('response', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('contact_form', 'response')
    op.drop_column('contact_form', 'message')
    # ### end Alembic commands ###
