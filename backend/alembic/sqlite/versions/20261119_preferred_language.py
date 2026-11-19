"""Add per-user preferred interface language.

Revision ID: i18n_language_sqlite
Revises: 7899f8d4d839
Create Date: 2026-11-19
"""
from alembic import op
import sqlalchemy as sa

revision = "i18n_language_sqlite"
down_revision = "7899f8d4d839"
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "preferred_language",
                sa.String(length=10),
                nullable=False,
                server_default=sa.text("'id'"),
                comment="User interface language preference",
            )
        )


def downgrade() -> None:
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("preferred_language")
