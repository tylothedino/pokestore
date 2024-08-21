"""empty message

Revision ID: 4fd819398eea
Revises: ffdc0a98111c
Create Date: 2024-08-21 10:16:05.437961

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "4fd819398eea"
down_revision = "ffdc0a98111c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("address", sa.String(length=255), nullable=False))
        batch_op.add_column(
            sa.Column("first_name", sa.String(length=30), nullable=False)
        )
        batch_op.add_column(
            sa.Column("last_name", sa.String(length=30), nullable=False)
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("last_name")
        batch_op.drop_column("first_name")
        batch_op.drop_column("address")

    # ### end Alembic commands ###
