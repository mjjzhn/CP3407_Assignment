"""add subject field to Contact_form

Revision ID: 3dd627d1c973
Revises: e6121ada4452
Create Date: 2022-05-23 21:26:38.810364

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3dd627d1c973'
down_revision = 'e6121ada4452'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('contact_form', sa.Column('subject', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('contact_form', 'subject')
    # ### end Alembic commands ###
